import { circularProgressClasses } from "@mui/material/CircularProgress";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { iconButtonClasses } from "@mui/material/IconButton";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { listClasses } from "@mui/material/List";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { paperClasses } from "@mui/material/Paper";
import SvgIcon, { svgIconClasses } from "@mui/material/SvgIcon";
import { textFieldClasses } from "@mui/material/TextField";

import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Components, Theme } from "@mui/material/styles";
import { paper, varAlpha } from "../../styles";

// ----------------------------------------------------------------------

const MuiDataGrid: Components<Theme>["MuiDataGrid"] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    slots: {
      /* Column */
      columnSortedAscendingIcon: (props: SvgIconProps) => <DataGridArrowUpIcon sx={{ color: "text.primary" }} {...props} />,
      columnSortedDescendingIcon: (props: SvgIconProps) => <DataGridArrowDownIcon sx={{ color: "text.primary" }} {...props} />,
      columnUnsortedIcon: (props: SvgIconProps) => <DataGridArrowUpIcon fontSize={props.fontSize} className={props.className} sx={{ color: "text.disabled" }} />,
    },
    slotProps: {
      basePopper: { placement: "bottom-end" },
      baseChip: { size: "small" },
      baseSwitch: { size: "small" },
      baseCheckbox: { size: "small", disableRipple: true },
      baseInputLabel: { shrink: true },
      baseTextField: { variant: "outlined" },
      baseSelect: { native: true, variant: "outlined" },
    },
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      "--unstable_DataGrid-radius": 0,
      "--DataGrid-rowBorderColor": theme.vars.palette.divider,
      "--DataGrid-containerBackground": theme.vars.palette.background.neutral,
      "--unstable_DataGrid-headWeight": theme.typography.fontWeightSemiBold,
      borderWidth: 0,
      // Minimal default style
      // Commented in favor of scrollbar defined with GlobalStyles
      // scrollbarWidth: 'thin',
      // scrollbarColor: `${varAlpha(theme.vars.palette.text.disabledChannel, 0.4)} ${varAlpha(theme.vars.palette.text.disabledChannel, 0.08)}`,
      "& .MuiDataGrid-filler > div": { borderTopStyle: "dashed" },
      "& .MuiDataGrid-topContainer::after": { height: 0 },

      // get last cell of the row
      [`& .last-column`]: {
        position: "sticky",
        right: 0,
        zIndex: 3,
        backgroundColor: theme.vars.palette.background.paper,
      },
      [`& .last-header`]: {
        position: "sticky",
        right: 0,
        zIndex: 3,
        backgroundColor: "var(--DataGrid-containerBackground)",
      },
      [`& .MuiDataGrid-row:hover`]: {
        [`.last-column::before`]: {
          content: `""`,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: theme.vars.palette.action.hover,
        },
      },
    }),
    withBorderColor: { borderColor: "var(--DataGrid-rowBorderColor)" },
    /**
     * Column
     */
    columnHeader: ({ theme }) => ({
      fontSize: 14,
      color: theme.vars.palette.text.secondary,
      "&--sorted": { color: theme.vars.palette.text.primary },
      "&:focus": {
        outline: "none",
      },
    }),
    columnSeparator: { color: "var(--DataGrid-rowBorderColor)" },
    /**
     * Row, Cell
     */
    cell: ({ theme }) => ({
      borderTopStyle: "dashed",
      "&--editing": {
        boxShadow: "none",
        backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
      },
      [`&:has(> *)`]: {
        display: "flex",
        alignItems: "center",
      },
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      "&:focus": {
        outline: "none",
      },
      [`&:focus-within`]: {
        outline: "none",
      },
    }),
    /**
     * Toolbar
     */
    toolbarContainer: ({ theme }) => ({
      border: "none", // minimal default do not have this rule
      gap: theme.spacing(2),
      padding: theme.spacing(2),
      [`& .${textFieldClasses.root}`]: {
        padding: 0,
        width: "100%",
        [`& .${inputBaseClasses.input}`]: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("md")]: { width: "unset" },
      },
    }),
    /**
     * Paper
     */
    paper: ({ theme }) => ({
      ...paper({ theme, dropdown: true }),
      padding: 0,
    }),
    menu: ({ theme }) => ({
      [`& .${paperClasses.root}`]: {
        ...paper({ theme, dropdown: true }),
        minWidth: 140,
      },
      [`& .${listClasses.root}`]: {
        padding: 0,
        [`& .${listItemIconClasses.root}`]: {
          minWidth: 0,
          marginRight: theme.spacing(2),
        },
      },
    }),
    /**
     * Icons
     */
    menuIcon: ({ theme }) => ({
      [`& .${iconButtonClasses.root}`]: {
        margin: theme.spacing(0, 1),
        padding: theme.spacing(0.25),
      },
    }),
    iconButtonContainer: ({ theme }) => ({
      [`& .${iconButtonClasses.root}`]: {
        padding: theme.spacing(0.25),
        marginLeft: theme.spacing(1),
      },
    }),
    /**
     * Footer
     */
    footerContainer: {
      minHeight: "auto",
      // borderTopStyle: 'dashed',
      border: "none",
    },
    selectedRowCount: { display: "none", whiteSpace: "nowrap" },
    overlay: ({ theme }) => ({
      [`& .${circularProgressClasses.root}`]: {
        color: theme.vars.palette.text.primary,
      },
    }),
    /**
     * Column panel
     */
    columnsManagementHeader: ({ theme }) => ({
      padding: theme.spacing(2.5, 2, 0, 2),
      [`& .${inputBaseClasses.input}`]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    }),
    columnsManagement: ({ theme }) => ({
      gap: theme.spacing(0.5),
      padding: theme.spacing(2, 1.5),
      [`& .${formControlLabelClasses.root}`]: { gap: 4, marginLeft: 0 },
    }),
    columnsManagementFooter: ({ theme }) => ({
      borderTopStyle: "dashed",
      padding: theme.spacing(1.5),
      [`& .${formControlLabelClasses.root}`]: { gap: 4, marginLeft: 0 },
    }),
    /**
     * Filter panel
     */
    filterForm: ({ theme }) => ({
      alignItems: "center",
      gap: theme.spacing(1.5),
      padding: theme.spacing(2),
      /* Fix label with input variant === 'outlined' */
      [`& .${inputLabelClasses.shrink}`]: {
        transform: "translate(14px, -9px) scale(0.75)",
      },
    }),
    filterFormDeleteIcon: ({ theme }) => ({
      [`& .${iconButtonClasses.root}`]: {
        padding: theme.spacing(0.25),
        backgroundColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
        [`& .${svgIconClasses.root}`]: { width: 16, height: 16 },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const dataGrid = { MuiDataGrid };

// ----------------------------------------------------------------------

/**
 * Icons
 */
/* https://icon-sets.iconify.design/solar/alt-arrow-up-bold-duotone */
export const DataGridArrowUpIcon = ({ ...props }: SvgIconProps) => (
  <SvgIcon sx={{ width: 20, height: 20, ...props.sx }} {...props}>
    <path fill="currentColor" d="m8.303 11.596l3.327-3.431a.499.499 0 0 1 .74 0l6.43 6.63c.401.414.158 1.205-.37 1.205h-5.723z" />
    <path fill="currentColor" d="M11.293 16H5.57c-.528 0-.771-.791-.37-1.205l2.406-2.482z" opacity="0.5" />
  </SvgIcon>
);

/* https://icon-sets.iconify.design/solar/alt-arrow-down-bold-duotone */
export const DataGridArrowDownIcon = ({ ...props }: SvgIconProps) => (
  <SvgIcon sx={{ width: 20, height: 20, ...props.sx }} {...props}>
    <path fill="currentColor" d="m8.303 12.404l3.327 3.431c.213.22.527.22.74 0l6.43-6.63C19.201 8.79 18.958 8 18.43 8h-5.723z" />
    <path fill="currentColor" d="M11.293 8H5.57c-.528 0-.771.79-.37 1.205l2.406 2.481z" opacity="0.5" />
  </SvgIcon>
);
